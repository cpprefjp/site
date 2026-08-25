# do_get_weekday
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_get_weekday(iter_type s, iter_type end, ios_base& str,
                                 ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
曜日名を解析する。[`get_weekday()`](get_weekday.md)から呼び出される仮想関数である。


## 効果
`s`から文字を読み取り、（省略形かもしれない）曜日名を抽出するまで処理を続ける。

省略形を見つけ、その後ろにフルネームと一致しうる文字が続く場合は、フルネームと一致するか失敗するまで読み取りを続ける。

結果に応じて`t->tm_wday`メンバを設定する。


## 戻り値
妥当な名前の一部と認識した最後の文字の直後を指すイテレータ。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::get_weekday`](get_weekday.md)
