# do_truename
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type do_truename() const; // (1) C++98
```

## 概要
`true`を表す文字列を取得する。[`truename()`](truename.md)から呼び出される仮想関数である。

この文字列は、[`std::ios_base::boolalpha`](/reference/ios/ios_base/type-fmtflags.md)が設定されている場合の`bool`値の入出力で使用される。


## 戻り値
真偽値`true`の名前を表す文字列を返す。

基底クラスの実装では、`"true"`もしくは`L"true"`である。

## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::truename`](truename.md)
- [`numpunct::do_falsename`](do_falsename.md)
