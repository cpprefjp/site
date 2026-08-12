# swap (非メンバ関数)
* hazard_pointer[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  void swap(hazard_pointer& a, hazard_pointer& b) noexcept;
}
```

## 概要
2つの`hazard_pointer`オブジェクトのハザードポインタの所有権を入れ替える。


## 効果
以下と等価である：

```cpp
a.swap(b);
```
* swap[link swap.md]


## 戻り値
なし


## 例外
投げない


## 計算量
定数時間


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::hazard_pointer::swap`](swap.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
