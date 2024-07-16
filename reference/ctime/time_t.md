# time_t
* ctime[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using time_t = implementation-defined;
}
```

## 概要
`time_t`は、1970年1月1日からの経過時間 (UNIX時間と呼ばれる) を表すための、算術型の別名である。

- C++11 (C99) まで、この型は整数型の別名
- C++14 (C11) 以降、この型は整数型もしくは浮動小数点数型の別名

この型の分解能と値の範囲は実装定義。


## 備考
- 値の範囲が実装定義であるため、策定当時の標準ライブラリ実装では32ビット符号付き整数型の別名として定義されていた。しかし32ビットでは秒単位で扱った場合に、西暦2038年1月19日にオーバーフローしてしまうことが判明した。そのため、現在多くの実装では64ビット符号付き整数型の別名として定義される。64ビットで秒単位の場合は西暦3000億年まで扱えるため、オーバーフローの問題は気にしなくてよいだろう
- Cの規格として、`time_t`はreal typeであると定義される。Cでのreal typeは、整数型と浮動小数点型の総称である
    - C++にそのような型の分類はない


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // ビット数を確認
  std::cout << sizeof(std::time_t) * 8 << std::endl;

  // 現在日時を取得 (1970年1月1日からの経過秒)
  std::time_t now = std::time(nullptr);

  // 現在日時を文字列に変換して出力
  std::cout << std::ctime(&now) << std::endl;
}
```
* std::time_t[color ff0000]
* std::time[link time.md.nolink]
* std::ctime[link ctime.md.nolink]

### 出力例
```
64
Fri Dec 20 16:21:01 2019
```


## 参照
- [UNIX時間 - Wikiepdia](https://ja.wikipedia.org/wiki/UNIX%E6%99%82%E9%96%93)
- [2038年問題 - Wikipedia](https://ja.wikipedia.org/wiki/2038%E5%B9%B4%E5%95%8F%E9%A1%8C)
