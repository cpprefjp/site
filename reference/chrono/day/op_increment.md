# operator++
* chrono[meta header]
* std::chrono[meta namespace]
* day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr day& operator++() noexcept;   // (1) C++20
constexpr day operator++(int) noexcept; // (2) C++20
```

## 概要
`day`の値をインクリメントする

- (1) : 前置インクリメント
- (2) : 後置インクリメント


## 効果
メンバ変数として保持している`unsigned int`型の日を表す値`d`があるとして、

- (1) : `++d`
- (2) : `++(*this)`


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
  // 前置インクリメント
  {
    chrono::day d{1};

    assert(static_cast<unsigned int>(++d) == 2);
    assert(static_cast<unsigned int>(d) == 2);
  }

  // 後置インクリメント
  {
    chrono::day d{1};

    assert(static_cast<unsigned int>(d++) == 1);
    assert(static_cast<unsigned int>(d) == 2);
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
