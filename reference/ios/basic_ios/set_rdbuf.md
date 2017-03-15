# set_rdbuf
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void set_rdbuf(basic_streambuf<CharT, Traits>* sb);
```
* basic_streambuf[link ../../streambuf/basic_streambuf.md]


## 概要
ストリームバッファオブジェクトを設定する。


## 要件
`sb` はヌルポインタでは無いこと


## 効果
`*this` に紐づくストリームバッファ（[`basic_streambuf`](../../streambuf/basic_streambuf.md)）オブジェクトを引数 `sb` に設定する（`rdbuf() == sb` となる）。  
なお、publicメンバ関数の [`rdbuf`](rdbuf.md) と異なり、ストリームバッファオブジェクトの設定後、[`clear`](clear.md)`()` は呼び出さない。


## 戻り値
無し


## 例外
投げない


## バージョン
### 言語
- C++11


## 参照
- [`rdbuf`](rdbuf.md)
