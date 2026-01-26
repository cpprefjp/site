# SIGSEGV
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIGSEGV see below
```

## 概要
無効なメモリアクセス（不正なアドレス参照など）が発生した際に送られるシグナルの、シグナル番号を表すマクロ。

`int`型の正の整数の定数式に展開され、実際の値は未規定。

## 例
```cpp example
#include <csignal>
#include <cstdlib>

void signal_handler(int)
{
  std::_Exit(0);
}

int main()
{
  std::signal(SIGSEGV, signal_handler);

  int *p = nullptr;
  *p = 42; // 未定義動作。多くの処理系では SIGSEGV が発生するが、保証はない。

  return 0;
}
```
* SIGSEGV[color ff0000]

### 出力
```
```
