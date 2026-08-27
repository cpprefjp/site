# swap
* istream[meta header]
* std[meta namespace]
* basic_iostream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void swap(basic_iostream& rhs); // (1) C++11
```
* basic_iostream[link ../basic_iostream.md]


## 概要
ストリームオブジェクトを交換する。


## 効果
[`basic_istream`](../basic_istream.md)`<char_type, traits_type>::`[`swap`](../basic_istream/swap.md)`(rhs)`を呼び出す。


## 戻り値
なし


## 備考
[`rdbuf`](../../ios/basic_ios/rdbuf.md)`()`は交換されない。


## バージョン
### 言語
- C++11


## 関連項目
- [`basic_iostream`](../basic_iostream.md)`::`[`operator=`](op_assign.md)
- [`basic_istream`](../basic_istream.md)`::`[`swap`](../basic_istream/swap.md)


## 参照
- [LWG Issue 911. I/O streams and move/swap semantic](https://cplusplus.github.io/LWG/issue911)
    - C++11で、ムーブコンストラクタ・ムーブ代入演算子・`swap`が`protected`となり、非メンバ関数の`swap`が削除された。派生クラスのみが使用でき、基底クラスのオブジェクトを直接ムーブ・交換できないようにするため
