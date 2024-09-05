import { CheckLicense } from "wasp/server/api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ApiErrorResponse = { error: string };

export const checkLicense: CheckLicense< { licenseKey: string }, { subscriptionStatus: string } | ApiErrorResponse > = async (req, res) => {
    const { licenseKey } = req.params;

    try {
        let currentStatus = 'inactive';

        const user = await prisma.user.findFirst({
            where: { licenseKey },
        });

        if(!user){
            return res.status(404).json({ error: 'License key is not found' });
        }

        if(user.subscriptionStatus){
            if(user.subscriptionStatus === 'active'){
                currentStatus = 'active';
            }
        }

        return res.json({ subscriptionStatus: currentStatus });
    } catch (err) {
        console.error('Error occured', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}