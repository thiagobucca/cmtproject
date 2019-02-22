package com.cmt.myapp.domain;


import javax.persistence.*;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class SendNotification implements Serializable {

    private static final long serialVersionUID = 1L;

    private String app_id;

    private List<String> include_player_ids;

    private List<String> included_segments;

    private ContentPush contents;

    public class ContentPush{
        public String en;

        public void setEn(String e){
            en = e;
        }
            

    }

    public SendNotification(){
        include_player_ids = new ArrayList<>();
        contents = new ContentPush();
    }

    /**
     * @return the app_id
     */
    public String getApp_id() {
        return app_id;
    }

    /**
     * @param app_id the app_id to set
     */
    public void setApp_id(String app_id) {
        this.app_id = app_id;
    }

    /**
     * @return the include_player_ids
     */
    public List<String> getInclude_player_ids() {
        return include_player_ids;
    }

    /**
     * @param include_player_ids the include_player_ids to set
     */
    public void setInclude_player_ids(List<String> include_player_ids) {
        this.include_player_ids = include_player_ids;
    }

    /**
     * @return the contents
     */
    public ContentPush getContents() {
        return contents;
    }

    /**
     * @param contents the contents to set
     */
    public void setContents(ContentPush contents) {
        this.contents = contents;
    }

    /**
     * @return the included_segments
     */
    public List<String> getIncluded_segments() {
        return included_segments;
    }

    /**
     * @param included_segments the included_segments to set
     */
    public void setIncluded_segments(List<String> included_segments) {
        this.included_segments = included_segments;
    }

}

