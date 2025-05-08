import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { User2 } from "lucide-react"

  const AvatarDemo = () =>  {
    return (
        <Avatar>
            <AvatarImage className=" " src=" " alt="@shadcn" />
            <AvatarFallback>
                <User2 width={22} height={22}/>
            </AvatarFallback>
        </Avatar>
    )
}

export default AvatarDemo

