# swap
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void swap(basic_istream& rhs); // (1) C++11
```
* basic_istream[link ../basic_istream.md]


## 概要
ストリームオブジェクトを交換する。


## 効果
[`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`swap`](../../ios/basic_ios/swap.md)`(rhs)`を呼び出し、`*this`と`rhs`の[`gcount()`](gcount.md)の値を交換する。


## 戻り値
なし


## 備考
[`rdbuf`](../../ios/basic_ios/rdbuf.md)`()`は交換されない。


## バージョン
### 言語
- C++11


## 関連項目
- [`basic_istream`](../basic_istream.md)`::`[`operator=`](op_assign.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`swap`](../../ios/basic_ios/swap.md)


## 参照
- [LWG Issue 911. I/O streams and move/swap semantic](https://cplusplus.github.io/LWG/issue911)
    - C++11で、ムーブコンストラクタ・ムーブ代入演算子・`swap`が`protected`となり、非メンバ関数の`swap`が削除された。派生クラスのみが使用でき、基底クラスのオブジェクトを直接ムーブ・交換できないようにするため
