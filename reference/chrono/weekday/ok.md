# ok
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`weekday`オブジェクトが保持する曜日の値が`[0, 6]`の範囲内かを判定する。


## 戻り値
コンストラクタで�定されて保持している曜日を表す値`wd`があるとして、以下を返す：

```cpp
return wd <= 6;
```

## 備考
- この関数は、値の妥当性を検証するのではなく、カレンダー範囲の値をもっているかの判定をする


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday w{0};
  assert(w.ok());

  assert(chrono::weekday{6}.ok());
  assert(chrono::weekday{7}.ok());  // 7はコンストラクタで0に置き換えられる
  assert(!chrono::weekday{8}.ok());
}
```
* ok()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (値7は0にならない), 10.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 参照
- [P1466R3 Miscellaneous minor fixes for chrono](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1466r3.html)
    - C++20で新規追加されるこの機能の�定�では、当初は日曜日ではじまり土曜日までの範囲をサポートしていた (`tm_wday`仕様の曜日範囲`[0, 6]`)。C++20の仕様が固まった段階では、ISO 8601で規定される、月曜日ではじまり日曜日までの曜日範囲 (`[1, 7]`) もサポートすることになり、値範囲`[1, 7]`を値範囲`[0, 6]`に変換する仕様が追加された
