# do_get_year
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_get_year(iter_type s, iter_type end, ios_base& str,
                                ios_base::iostate& err, tm* t) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* tm[link /reference/ctime/tm.md]

## 概要
年を解析する。[`get_year()`](get_year.md)から呼び出される仮想関数である。


## 効果
`s`から文字を読み取り、曖昧さのない年の識別子を抽出するまで処理を続ける。結果に応じて`t->tm_year`メンバを設定する。

2桁の年を受け付けるかどうか、受け付ける場合にどの世紀にあると仮定するかは、処理系定義である。


## 戻り値
妥当な年の識別子の一部と認識した最後の文字の直後を指すイテレータ。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::get_year`](get_year.md)
