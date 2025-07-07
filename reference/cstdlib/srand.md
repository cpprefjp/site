# srand
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
void srand( unsigned seed );
```

## 概要

`std::rand()`関数の疑似乱数生成器にシード値を渡す。

この関数が呼ばれる前に`std::rand()`が呼ばれた場合、`srand(1)`をシード値として実行される。

また、`stand()`が同様の数値、つまりシード値が同じなら、`std::rand()`は同様の数値を返す。

## 備考
この関数はスレッドセーフではない。

一般的には、`srand()`を一度呼び出し、シード値を定義したあとに、再シードするべきではない。

また、`std::time`は`std::time_t`を返し、整数型である保証はされていない。

ただし、多くの環境では、整数値として定義されている。

## 例

```cpp example
#include <cstdlib>
#include <ctime>
#include <iostream>
 
int main() 
{
  std::srand(std::time(0)); // 現在時刻を疑似乱数のシード値とする。
  std::cout << std::rand() << '\n';
}
```

## 出力例
```
1373858591
```

## 関連項目
- [`rand`](rand.md):疑似乱数を生成する
- [`RAND_MAX`](rand_max.md):`std::rand()`が返す最高値。
- [`time`](/reference/ctime/time.md.nolink):時刻を取得する
- [`time_t`](/reference/ctime/time_t.md):UNIX時間を表すための型。
