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
`time_t`は、1970年1月1日からの経過秒 (UNIX時間と呼ばれる) を表すための符号なし整数型である。

データ幅の規定がないため、策定当時の標準ライブラリ実装では32ビット符号なし整数型の別名として定義されていた。しかし32ビットでは西暦2038年1月19日3時14分7秒にオーバーフローしてしまうことが判明したため、現在多くの実装では64ビット符号なし整数型の別名として定義される。64ビットの場合は西暦3000億年まで扱えるため、オーバーフローの問題は気にしなくてよいだろう。


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

### 出力
```
64
Fri Dec 20 16:21:01 2019
```


## 参照
- [UNIX時間 - Wikiepdia](https://ja.wikipedia.org/wiki/UNIX%E6%99%82%E9%96%93)
- [2038年問題 - Wikipedia](https://ja.wikipedia.org/wiki/2038%E5%B9%B4%E5%95%8F%E9%A1%8C)
