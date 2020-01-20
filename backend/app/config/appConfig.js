let configuration={
    port:3000,
    version:'/api/v1',
    environment:'dev',
    allowedCorsOrigin:'*',
    dbUrl:{
        uri:'mongodb://127.0.0.1:27017/issueTrackerDb'
    },
    FACEBOOK_APP_ID:'604975566934296',
    FACEBOOK_APP_SECRET:'ebc1cb6832a729c75f9614365ac464b5',
    GOOGLE_CLIENT_ID:'571133514763-bro6ba27ohmptovojbk5umodsot7j4pj.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET:'pgbdULyqmaFafI4BqPn_rNT1',
    AWS_BUCKET_NAME:'issue-tracker-files',
    AWS_ACCESS_KEY_ID:'AKIA3KXMY3SDUTW5DSEF',
    AWS_SECRET_ACCESS_KEY:'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',
    AWS_REGION:'ap-south-1',
    AWS_FOLDER_NAME:'/attachments'
}



module.exports={
    configuration:configuration
}