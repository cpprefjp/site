# operator--
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr year& operator--() noexcept;   // (1) C++20
constexpr year operator--(int) noexcept; // (2) C++20
```

## 概要
`year`の値をデクリメントする

- (1) : 前置デクリメント
- (2) : 後置デクリメント


## 効果
メンバ変数として保持している`int`型の年を表す値`y`があるとして、

- (1) : `--y`
- (2) : `--(*this)`


## 戻り値
- (1) : `*this`
- (2) : この関数が呼ばれる前の`*this`のコピーを返す


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 前置デクリメント
  {
    chrono::year y{2020};

    assert(static_cast<int>(--y) == 2019);
    assert(static_cast<int>(y) == 2019);
  }

  // 後置デクリメント
  {
    chrono::year y{2020};

    assert(static_cast<int>(y--) == 2020);
    assert(static_cast<int>(y) == 2019);
  }
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
