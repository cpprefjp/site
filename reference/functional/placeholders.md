#placeholders (C++11)
* functional[meta header]

```cpp
namespace std {
namespace placeholders {
  extern unspecified _1;
  extern unspecified _2;
  …
  extern unspecified _N;
}}
```
* unspecified[italic]

##概要
`_1`、`_2`、…、`_N`は、[`bind()`](./bind.md)で使用するプレースホルダーオブジェクトである。

それぞれ、[`bind()`](./bind.md)によって返された関数オブジェクトに指定する「第1引数」「第2引数」…「第N引数」であることを意味する。


##備考
プレースホルダーの数(`N`の値)は、10以上実装することが推奨される。


##バージョン
###言語
- C++11

