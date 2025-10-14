# swap
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void
  swap(weak_ptr& r) noexcept; // (1) C++11
constexpr void
  swap(weak_ptr& r) noexcept; // (1) C++26
```

## 概要
他の`weak_ptr`オブジェクトとデータを入れ替える。


## 効果
`*this`と`r`の監視対象を入れ替える。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp1(new int(1));
  std::weak_ptr<int> wp1 = sp1;

  std::shared_ptr<int> sp2(new int(2));
  std::weak_ptr<int> wp2 = sp2;

  if (std::shared_ptr<int> r = wp1.lock()) {
    std::cout << r << std::endl;
  }

  if (std::shared_ptr<int> r = wp2.lock()) {
    std::cout << r << std::endl;
  }

  // wp1とwp2を入れ替える
  wp1.swap(wp2);

  if (std::shared_ptr<int> r = wp1.lock()) {
    std::cout << r << std::endl;
  }

  if (std::shared_ptr<int> r = wp2.lock()) {
    std::cout << r << std::endl;
  }
}
```
* swap[color ff0000]
* lock()[link lock.md]

### 出力例
```
0x14ab010
0x14ab060
0x14ab060
0x14ab010
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)