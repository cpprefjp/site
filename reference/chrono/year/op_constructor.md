# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
year() = default;                        // (1) C++20
constexpr explicit year(int y) noexcept; // (2) C++20

year(const year&) = default;             // (3) C++20
year(year&&) = default;                  // (4) C++20
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 年を指定して`year`オブジェクトを構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `y`を、年を表す値としてメンバ変数に保持する
    - `y`が`[-32767, 32767]`の範囲外である場合、保持される値は未規定となる


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::year y{2020};
  assert(static_cast<int>(y) == 2020);
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
