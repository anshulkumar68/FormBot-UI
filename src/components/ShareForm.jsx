import React, { useState } from 'react'
import styles from './ShareForm.module.css'
import { IoClose } from "react-icons/io5";

const ShareForm = ({setIsSharePopupOpen}) => {
    const [shareEmail, setShareEmail] = useState("");
    const handleClosePopup = () =>{
        setIsSharePopupOpen(false);
    }
    const handleShare = () =>{
        emailToShare(shareEmail);
    }

  return (
    <>
         <div className={styles.overlay} onClick={handleClosePopup}>
            <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
              <p className={styles.closeIconContainer}>
              <IoClose className={styles.closeIcon} onClick={handleClosePopup}/>
              </p>
                <div className={styles.inviteEmail}>
                <p className={styles.inviteEmailEditView}>
                <span>Invite by Email</span>
                <select >
                    <option value="Edit">Edit</option>
                    <option value="View">View</option>
                </select>
                  </p>
                <input
                  type="text"
                  placeholder="Enter email id"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
                </div>
                <button className={styles.btn}>Send Invite</button>
                <p className={styles.copyLink}>
                <span>Invite by link</span>
                <button className={styles.btn}>Copy link</button>
                </p>
            </div>
          </div>
    </>
  )
}

export default ShareForm