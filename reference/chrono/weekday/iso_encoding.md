# iso_encoding
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr unsigned int iso_encoding() const noexcept; // (1) C++20
```

## 概要
`weekday`オブジェクトが保持する曜日の値を、ISO 8601の仕様に基づき、月曜日から日曜日までを値の範囲`[1, 7]`として取得する。


## 戻り値
コンストラクタで設定された、日曜日から土曜日までの値範囲`[0, 6]`を持つ変数`wd`があるとして、以下を返す：

```cpp
return wd == 0u ? 7u : wd;
```


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday ar[] = {
    chrono::Monday,
    chrono::Tuesday,
    chrono::Wednesday,
    chrono::Thursday,
    chrono::Friday,
    chrono::Saturday,
    chrono::Sunday
  };

  for (chrono::weekday w : ar) {
    std::cout << w << " : " << w.iso_encoding() << std::endl;
  }
}
```
* iso_encoding()[color ff0000]
* chrono::Monday[link /reference/chrono/weekday_constants.md]
* chrono::Tuesday[link /reference/chrono/weekday_constants.md]
* chrono::Wednesday[link /reference/chrono/weekday_constants.md]
* chrono::Thursday[link /reference/chrono/weekday_constants.md]
* chrono::Friday[link /reference/chrono/weekday_constants.md]
* chrono::Saturday[link /reference/chrono/weekday_constants.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]

### 出力
```
Mon : 1
Tue : 2
Wed : 3
Thu : 4
Fri : 5
Sat : 6
Sun : 7
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [ISO 8601 - Wikipedia](https://ja.wikipedia.org/wiki/ISO_8601)
- [P1466R3 Miscellaneous minor fixes for chrono](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1466r3.html)
