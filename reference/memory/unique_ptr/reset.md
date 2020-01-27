# reset
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reset(pointer p = pointer()) noexcept;   // (1)

// 配列版のみ
void reset(nullptr_t p) noexcept;             // (2) C++14まで
void reset(nullptr_t = nullptr) noexcept;     // (2) C++17

template <class U> void reset(U) = delete;    // (3) C++14まで
template <class U> void reset(U p) noexcept;  // (3) C++17
```

## 概要
リソースの所有権を放棄し、新たなリソースの所有権を�定する。


## 効果
- (1) : 保持しているポインタ変数に`p`を代入する。デフォルト引数を使用する場合、この関数を呼び出したあと`*this`はリソースを保持していない状態になる。
    代入前に保持していたポインタ変数を`old_p`とし、それが`nullptr`でなければ、[`get_deleter()`](get_deleter.md)`(old_p)`によって、保持していたポインタを解放する。

- (2) :
    - `reset(pointer())`と�価の効果を持つ。

- (3) : 
    - C++14まで : 他のポインタ型から`pointer`型への変換を禁�する。
    - C++17 : (1)と�価、ただし以下のどちらかの場合にのみオーバー�ード解決に参加する。
        - `U`はメンバ型`pointer`と同じ型
        - `pointer`は`element_type*`と同じ型かつ`U`は何らかのポインタ型`V*`であり、`V(*)[]`は`element_type(*)[]`に変換可能である


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // リソースを解放
  p.reset();
  if (!p) {
    std::cout << "p doesn't have resource" << std::endl;
  }

  // リソースを再�定
  p.reset(new int(2));
  std::cout << *p << std::endl;
}
```
* reset[color ff0000]

### 出力
```
p doesn't have resource
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
    - 2012までは、delete宣言に対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照
- [LWG Issue 2169. Missing `reset()` requirements in `unique_ptr` specialization](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2169)
- [N4089 Safe conversions in unique_ptr<T[]>, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4089.pdf)
