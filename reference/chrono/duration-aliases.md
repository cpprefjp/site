# seconds
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

  using days        = duration<少なくても25ビットを持つ符号付き整数型,
                               ratio_multiply<ratio<24>, hours::period>>;             // (7) C++20
  using weeks       = duration<少なくても22ビットを持つ符号付き整数型,
                               ratio_multiply<ratio<7>, days::period>>;               // (8) C++20
  using years       = duration<少なくても17ビットを持つ符号付き整数型,
                               ratio_multiply<ratio<146097, 400>, days::period>>;     // (9) C++20
  using months      = duration<少なくても20ビットを持つ符号付き整数型,
                               ratio_divide<years::period, ratio<12>>>;               // (10) C++20
}}
```
* duration[link /reference/chrono/duration.md]
* ratio[link /reference/ratio.md]
* nano[link /reference/ratio/si_prefix.md]
* micro[link /reference/ratio/si_prefix.md]
* milli[link /reference/ratio/si_prefix.md]
* ratio_multiply[link /reference/ratio/ratio_multiply.md]
* ratio_divide[link /reference/ratio/ratio_divide.md]

## 概要
さまざまな日付・時間単位をの経過時間を表現する[`duration`](duration.md)型の別名。

- (1) : ナノ秒単位で経過時間を表現する[`duration`](duration.md)型の別名
- (2) : マイクロ秒単位で経過時間を表現する[`duration`](duration.md)型の別名
- (3) : ミリ秒単位で経過時間を表現する[`duration`](duration.md)型の別名
- (4) : 秒単位で経過時間を表現する[`duration`](duration.md)型の別名
- (5) : 分単位で経過時間を表現する[`duration`](duration.md)型の別名
- (6) : 時単位で経過時間を表現する[`duration`](duration.md)型の別名
- (7) : 日単位で経過時間を表現する[`duration`](duration.md)型の別名
- (8) : 週単位で経過時間を表現する[`duration`](duration.md)型の別名
- (9) : 年単位で経過時間を表現する[`duration`](duration.md)型の別名
- (10) : 月単位で経過時間を表現する[`duration`](duration.md)型の別名


## 備考
- 単位ごとの値を保持する型として「最低でもNビットを持つ符号付き整数型」という定義がされるが、これは標準ライブラリがサポートするすべての時間単位で±292年を最小範囲として表現できることを意図している
    - ナノ秒として64ビット符号付き整数を使用した場合、±292年の範囲を扱える
- 1ヶ月を表す`duration`は年を12で割った値となるため、月は年よりあとに定義される


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
* chrono::duration_cast[link duration_cast.md]

#### 出力
```
50
50000
1
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

