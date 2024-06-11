# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool operator==(const weekday& x, const weekday& y) noexcept; // (1) C++20
}
```

## 概要
`weekday`同士の等値比較を行う。


## 戻り値
コンストラクタで設定されて保持している曜日を表す値`wd`があるとして、以下を返す：

```cpp
return x.wd == y.wd;
```


## 例外
投げない


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::Sunday == chrono::Sunday);
  assert(chrono::Sunday != chrono::Tuesday);
}
```
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::Tuesday[link /reference/chrono/weekday_constants.md]

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
