# move
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void move(basic_ios& rhs);  // (1) C++11

  void move(basic_ios&& rhs); // (2) C++11
```
* basic_ios[link ../basic_ios.md]


## 概要
ストリームオブジェクトをムーブする。


## 効果
`*this` の状態を、本関数が呼びだされる前の引数 `rhs` の状態と同一にする。ただし、[`rdbuf`](rdbuf.md)`()` は `0` となる。  
本関数の呼び出し後、`rhs` の状態は有効だが不定となる。ただし、`rhs.`[`rdbuf`](rdbuf.md)`()` は呼び出し前と変わらず、`rhs.`[`tie`](tie.md)`()` は `0` を返す。


## 戻り値
無し


## バージョン
### 言語
- C++11


## 参照
- [`basic_ios`](../basic_ios.md)`::`[`swap`](swap.md)
- [LWG Issue 1104. `basic_ios::move` should accept lvalues](https://cplusplus.github.io/LWG/issue1104)
    - C++11で、左辺値を受け取るオーバーロードが追加された。派生クラスのムーブコンストラクタから、基底クラスの部分オブジェクトを名前で渡せるようにするため
