# do_falsename
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type do_falsename() const; // (1) C++98
```

## 概要
`false`を表す文字列を取得する。[`falsename()`](falsename.md)から呼び出される仮想関数である。

この文字列は、[`std::ios_base::boolalpha`](/reference/ios/ios_base/type-fmtflags.md)が設定されている場合の`bool`値の入出力で使用される。


## 戻り値
真偽値`false`の名前を表す文字列を返す。

基底クラスの実装では、`"false"`もしくは`L"false"`である。

## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::falsename`](falsename.md)
- [`numpunct::do_truename`](do_truename.md)
