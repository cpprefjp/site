# CLOCKS_PER_SEC
* ctime[meta header]
* macro[meta id-type]

```cpp
#define CLOCKS_PER_SEC implementation-defined
```

## 概要
[`clock()`](clock.md)関数が返す[`clock_t`](clock_t.md)値の、1秒あたりの数値。

[`clock()`](clock.md)が返した値をこの値で割ることで、秒単位のプロセッサ時間が得られる。値は処理系定義であり、C標準では`1000000` (10<sup>6</sup>) に展開されることが規定されている。


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
* CLOCKS_PER_SEC[color ff0000]
* std::clock_t[link clock_t.md]
* std::clock[link clock.md]

### 出力例
```
0.21秒
```


## 関連項目
- [`clock`](clock.md): プログラム実行開始からの経過時間を取得する
- [`clock_t`](clock_t.md)
