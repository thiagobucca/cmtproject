package com.cmt.myapp.domain;


import javax.persistence.*;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class SendNotification implements Serializable {

    private static final long serialVersionUID = 1L;

    private String app_id;

    private List<String> include_player_ids;

    private ContentPush contents;

    private class ContentPush{
        public String en;
    }

    public SendNotification(){
        include_player_ids = new ArrayList<>();
        contents = new ContentPush();
    }
    
}

