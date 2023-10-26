
interface PreLoadPropInterface {
    isLoading: boolean;
}

export default function PreLoad({ isLoading }: PreLoadPropInterface) {

    return (
        <div hidden={!isLoading} className="center">
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}