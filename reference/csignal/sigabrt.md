# SIGABRT
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIGABRT see below
```

## 概要
`abort`関数などによる異常終了時に送られるシグナルの、シグナル番号を表すマクロ。

`int`型の正の整数の定数式に展開され、実際の値は未規定。

## 例
```cpp example
#include <csignal>
#include <cstdlib>

void handler(int) {
    std::_Exit(0);
}

int main() {
    std::signal(SIGABRT, handler);
    std::abort();
}
```
* SIGABRT[color ff0000]

### 出力
```
```

## 関連項目
- [`abort`](/reference/cstdlib/abort.md)
