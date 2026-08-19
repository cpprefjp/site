# clock
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  clock_t clock();
}
```
* clock_t[link clock_t.md]

## 概要
プログラムの実行開始からの、処理系が使用したプロセッサ時間を取得する。

ここで得られる時間は、実世界の経過時間 (wall-clock time) ではなく、プログラムが処理系上で消費したCPU時間である。


## 戻り値
プログラム実行開始からの経過プロセッサ時間を、[`clock_t`](clock_t.md)型の値として返す。

プロセッサ時間が取得できない、もしくは値が表現できない場合、`(clock_t)(-1)`を返す。


## 備考
戻り値を秒単位の値に変換するには、[`CLOCKS_PER_SEC`](clocks_per_sec.md)で割る。

2点間の経過時間を計測するには、計測対象の前後で`clock()`を呼び出し、その差を求める。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  std::clock_t start = std::clock();

  // 計測対象の処理
  volatile long sum = 0;
  for (int i = 0; i < 100000000; ++i) {
    sum += i;
  }

  std::clock_t end = std::clock();

  // 経過したプロセッサ時間を秒に変換する
  double sec = static_cast<double>(end - start) / CLOCKS_PER_SEC;
  std::cout << sec << "秒" << std::endl;
}
```
* std::clock[color ff0000]
* std::clock_t[link clock_t.md]
* CLOCKS_PER_SEC[link clocks_per_sec.md]

### 出力例
```
0.21秒
```


## バージョン
### 言語
- C++03


## 関連項目
- [`clock_t`](clock_t.md)
- [`CLOCKS_PER_SEC`](clocks_per_sec.md)
- [`<chrono>`](/reference/chrono.md)
