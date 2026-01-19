# sig_atomic_t
* csignal[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using sig_atomic_t = integer-type;
}
```
* integer-type[italic]

## 概要
`sig_atomic_t`は、非同期シグナルハンドラと通常の実行コンテキストの間で、単純な読み書きを分断されずに行えることが保証された整数型である。

この型に対して保証されるのは単純な代入および読み出しのみであり、
複合操作や算術演算は保証されない。
実際の使用では通常`volatile`修飾子と組み合わせて用いられる。

具体的な型は処理系定義である。

## 備考
最大値は`SIG_ATOMIC_MAX`、最小値は`SIG_ATOMIC_MIN`に定義されている。

## 例
```cpp example
#include <csignal>
#include <iostream>

volatile std::sig_atomic_t flag = 0;

void signal_handler(int signum)
{
  flag = 1;
}

int main ()
{
  std::signal(SIGINT, signal_handler);
  while (!flag) {
    //処理
  }
  if (flag) {
    std::cout << "caught SIGINT" << std::endl;
  }
  return 0;
}
```
* std::sig_atomic_t[color ff0000]

### 出力例
```
caught SIGINT
```
`Ctrl + c`などで割り込みが発生した場合。  

## 関連項目
- [`SIG_ATOMIC_MAX`](/reference/cstdint/sig_atomic_max.md)
- [`SIG_ATOMIC_MIN`](/reference/cstdint/sig_atomic_min.md)
