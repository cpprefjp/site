# last_spec
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct last_spec {
    explicit last_spec() = default;
  };

  inline constexpr last_spec last{};
}
```

## 概要
`last_spec`は、月の最終日、週の最終日など、文脈に応じた「最後」を表す型である。その型の値として`last`が定義される。


## 非メンバ関数
### カレンダー構文演算�

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](last_spec/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // 月の最終日
  sys_days date1{2020y/February/last};
  assert(date1 == sys_days{2020y/February/29});
  std::cout << date1 << std::endl;

  // 月の最後の指定した曜日
  sys_days date2{2019y/November/Sunday[last]};
  assert(date2 == sys_days{2019y/November/24});
  std::cout << date2 << std::endl;
}
```
* last[color ff0000]
* sys_days[link sys_time.md]
* 2020y[link year/op_y.md]
* 2019y[link year/op_y.md]
* February[link month_constants.md]
* November[link month_constants.md]

### 出力
```
2020-02-29
2019-11-24
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
