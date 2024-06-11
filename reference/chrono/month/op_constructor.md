# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* month[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
month() = default;                                 // (1) C++20
constexpr explicit month(unsigned int m) noexcept; // (2) C++20

month(const month&) = default;                     // (3) C++20
month(month&&) = default;                          // (4) C++20
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 月を指定して`month`オブジェクトを構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `m`を、月を表す値としてメンバ変数に保持する
    - 通常は`[1, 12]`の範囲内で指定するが、それを超えてもよい
    - `m`が`[0, 255]`の範囲外である場合、保持される値は未規定となる


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::month m{1};
  assert(m == chrono::January);
}
```
* chrono::January[link /reference/chrono/month_constants.md]

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
