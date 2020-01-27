# 時間間隔を表す型
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  using nanoseconds  = duration<少なくても64ビットを持つ符号付き整数型, nano>;        // (1) C++11
  using microseconds = duration<少なくても55ビットを持つ符号付き整数型, micro>;       // (2) C++11
  using milliseconds = duration<少なくても45ビットを持つ符号付き整数型, milli>;       // (3) C++11
  using seconds      = duration<少なくても35ビットを持つ符号付き整数型>;              // (4) C++11
  using minutes      = duration<少なくても29ビットを持つ符号付き整数型, ratio<60>>;   // (5) C++11
  using hours        = duration<少なくても23ビットを持つ符号付き整数型, ratio<3600>>; // (6) C++11

  using days         = duration<少なくても25ビットを持つ符号付き整数型,
                                ratio_multiply<ratio<24>, hours::period>>;            // (7) C++20
  using weeks        = duration<少なくても22ビットを持つ符号付き整数型,
                                ratio_multiply<ratio<7>, days::period>>;              // (8) C++20
  using years        = duration<少なくても17ビットを持つ符号付き整数型,
                                ratio_multiply<ratio<146097, 400>, days::period>>;    // (9) C++20
  using months       = duration<少なくても20ビットを持つ符号付き整数型,
                                ratio_divide<years::period, ratio<12>>>;              // (10) C++20
}}
```
* ratio[link /reference/ratio.md]
* nano[link /reference/ratio/si_prefix.md]
* micro[link /reference/ratio/si_prefix.md]
* milli[link /reference/ratio/si_prefix.md]
* ratio_multiply[link /reference/ratio/ratio_multiply.md]
* ratio_divide[link /reference/ratio/ratio_divide.md]

## 概要
さまざまな日付・時間単位をの時間間隔を表現する[`duration`](duration.md)型の別名。

- (1) : ナノ秒単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (2) : マイク�秒単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (3) : ミリ秒単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (4) : 秒単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (5) : 分単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (6) : 時単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (7) : 日単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (8) : 週単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (9) : 年単位で時間間隔を表現する[`duration`](duration.md)型の別名
- (10) : 月単位で時間間隔を表現する[`duration`](duration.md)型の別名


## 備考
- 単位ごとの値を保持する型として「最低でもNビットを持つ符号付き整数型」という定義がされるが、これは標準ライブラリがサポートするすべての時間単位で±292年を最小範囲として表現できることを意図している
    - ナノ秒として64ビット符号付き整数を使用した場合、±292年の範囲を扱える
    - 時としての規定は23ビット以上だが、23ビットの場合に表現できる範囲は±478年となり、1ビットを減らして22ビットにすると表現範囲は±239年となる。22ビットでは目標の±292を下回ってしまう
- 1ヶ月を表す`duration`は年を12で割った値となるため、月は年よりあとに定義される
- 年は、400年に97回だけうるう年があるため、400年分の日数146097を400で割った平均的な年の日数として定義される


## 例
### 単位変換を含む基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::seconds s1{30};
  chrono::seconds s2{20};

  // 秒同士の演算
  // 30秒 + 20秒 = 50秒
  chrono::seconds result = s1 + s2;
  std::cout << result.count() << std::endl;

  // 秒からミリ秒に変換
  // 50秒 = 50000ミリ秒
  chrono::milliseconds ms = result;
  std::cout << ms.count() << std::endl;

  // 秒から分に変換
  // 65秒は1分5秒だが、整数表現の分に変換する際に5秒が切り捨てられるため、
  // 1分となる。
  // 切り捨てが発生する場合には、duration_cast()関数を使用する。
  chrono::seconds s3{65};
  chrono::minutes m = chrono::duration_cast<chrono::minutes>(s3);
  std::cout << m.count() << std::endl;
}
```
* count()[link duration/count.md]

#### 出力
```
50
50000
1
```


### 日付単位の変換 (C++20)
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // 年から月への変換。duration_castは不要
  months m1 = years{3};
  assert(m1.count() == 36);

  // 月から年への変換。duration_castが必要
  months m2{37};
  auto y2 = duration_cast<years>(m2);
  assert(y2.count() == 3);

  // 年から日への変換。
  // 400年の平均的な日数として年が定義されるため、日に変換する際に端数が発生する。
  // そのため、duration_castが必要
  days d3 = duration_cast<days>(years{1});
  assert(d3.count() == 365);

  // 日から年への変換。端数が発生するため、duration_castが必要
  auto y4 = duration_cast<years>(days{366});
  assert(y4.count() == 1);

  // 週から月への変換。端数が発生するため、duration_castが必要
  auto w5 = duration_cast<weeks>(months{1});
  assert(w5.count() == 4);

  // 年から週への変換。duration_castが必要
  auto w6 = duration_cast<weeks>(years{1});
  assert(w6.count() == 52);
}
```
* count()[link duration/count.md]

#### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 関連項目
- [`sleep_for`](/reference/thread/this_thread/sleep_for.md)
- [`sleep_until`](/reference/thread/this_thread/sleep_until.md)

