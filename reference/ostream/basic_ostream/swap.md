#swap
* ios[meta header]
* std[meta namespace]
* basic_ostream[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void swap(basic_ostream& rhs);
```
* basic_ostream[link ../basic_ostream.md]


##概要
ストリームオブジェクトを交換する。


##効果
[`basic_ios`](../../ios/basic_ios.md)`<char_type, traits_type>::`[`swap`](../../ios/basic_ios/swap.md)`(rhs)` を呼び出す。


##戻り値
無し


##備考
[`rdbuf`](../../ios/basic_ios/rdbuf.md)`()` は交換されない。


##バージョン
###言語
- C++11


##参照
- [`basic_ios`](../../ios/basic_ios.md)`::`[`move`](../../ios/basic_ios/move.md)
- [`basic_ios`](../../ios/basic_ios.md)`::`[`swap`](../../ios/basic_ios/swap.md)
