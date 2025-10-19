# c_encoding
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr unsigned int c_encoding() const noexcept; // (1) C++20
```

## 概要
`weekday`オブジェクトが保持する曜日の値を、C / C++の仕様に基づき、日曜日から土曜日までを値の範囲`[0, 6]`として取得する。


## 戻り値
コンストラクタで設定された、日曜日から土曜日までの値範囲`[0, 6]`を持つ変数`wd`があるとして、以下を返す：

```cpp
return wd;
```


## 例外
投げない


## 備考
- この仕様は、`std::tm`クラスの`tm_wday`メンバ変数の値範囲に合わせたものである


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday ar[] = {
    chrono::Sunday,
    chrono::Monday,
    chrono::Tuesday,
    chrono::Wednesday,
    chrono::Thursday,
    chrono::Friday,
    chrono::Saturday
  };

  for (chrono::weekday w : ar) {
    std::cout << w << " : " << w.c_encoding() << std::endl;
  }
}
```
* c_encoding()[color ff0000]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::Monday[link /reference/chrono/weekday_constants.md]
* chrono::Tuesday[link /reference/chrono/weekday_constants.md]
* chrono::Wednesday[link /reference/chrono/weekday_constants.md]
* chrono::Thursday[link /reference/chrono/weekday_constants.md]
* chrono::Friday[link /reference/chrono/weekday_constants.md]
* chrono::Saturday[link /reference/chrono/weekday_constants.md]

### 出力
```
Sun : 0
Mon : 1
Tue : 2
Wed : 3
Thu : 4
Fri : 5
Sat : 6
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P1466R3 Miscellaneous minor fixes for chrono](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1466r3.html)
