# clock_t
* ctime[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using clock_t = arithmetic-type;
}
```
* arithmetic-type[italic]

## 概要
`clock_t`は、[`clock()`](clock.md)関数が返すプロセッサ時間を表すための、算術型の別名である。

この型の値を秒数に変換するには、[`CLOCKS_PER_SEC`](clocks_per_sec.md)で割る。


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
* std::clock_t[color ff0000]
* std::clock[link clock.md]
* CLOCKS_PER_SEC[link clocks_per_sec.md]

### 出力例
```
0.21秒
```


## バージョン
### 言語
- C++98


## 関連項目
- [`clock`](clock.md): プログラム実行開始からの経過時間を取得する
- [`CLOCKS_PER_SEC`](clocks_per_sec.md)
