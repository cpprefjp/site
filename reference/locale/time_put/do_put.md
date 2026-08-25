# do_put
* locale[meta header]
* std[meta namespace]
* time_put[meta class]
* function[meta id-type]

```cpp
protected:
  virtual iter_type do_put(iter_type s, ios_base& str, char_type fill, const tm* t,
                           char format, char modifier) const; // (1) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* tm[link /reference/ctime/tm.md]

## 概要
日時を書式化して出力する。[`put()`](put.md)から呼び出される、実際の書式化を行う仮想関数である。


## 効果
引数`t`の内容を書式化し、出力列`s`へ文字を格納する。

書式化は引数`format`と`modifier`によって制御される。これらは標準ライブラリ関数[`std::strftime()`](/reference/ctime/strftime.md)の書式文字列における書式指定子と同一に解釈される。ただし、Cロケールに依存すると規定されている指定子について生成される文字列は、処理系定義である。

`modifier`引数の解釈は処理系定義である。


## 戻り値
生成した最後の文字の直後を指すイテレータ。


## 備考
`fill`は、処理系定義の書式や派生クラスでの実装において使用できる。空白文字がこの引数の妥当な既定値である。

`modifier`の解釈はPOSIXの慣習に従うことが推奨される。また、Cロケールに依存すると規定されている指定子について生成される文字列については、POSIXなどの他の標準を参照することが推奨される。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_put::put`](put.md)
- [`std::strftime`](/reference/ctime/strftime.md)
