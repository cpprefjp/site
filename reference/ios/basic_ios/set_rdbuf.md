# set_rdbuf
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void set_rdbuf(basic_streambuf<CharT, Traits>* sb); // (1) C++11
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
- [LWG Issue 1183. `basic_ios::set_rdbuf` may break class invariants](https://cplusplus.github.io/LWG/issue1183)
    - C++11で、`sb`がヌルポインタでないという要件が追加された。ヌルポインタを設定すると、[`clear()`](clear.md)を呼ばないこの関数ではエラー状態が更新されず、クラス不変条件が壊れるため
