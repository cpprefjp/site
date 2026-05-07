# jmp_buf
* std[meta namespace]
* csetjmp[meta header]
* type-alias[meta id-type]

```cpp
namespace std {
  using jmp_buf = unspecified;
}
```
* unspecified[italic]

## 概要

`jmp_buf`は、非ローカルジャンプ（関数を跨いだジャンプ）を実現するために、現在の実行環境を保存するための配列型である。

[`setjmp()`](setjmp.md)マクロによって現在の環境がこの型に保存され、後に[`longjmp()`](longjmp.md)関数がその環境を復元するために使用される。

## 例

```cpp example
#include <iostream>
#include <csetjmp>

std::jmp_buf env;

void inner_function() {
  std::cout << "何らかのエラー" << std::endl;
  std::longjmp(env, 42);
}

int main () {
  if (setjmp(env) == 0) {
    inner_function();
  } else {
    std::cout << "エラーから復帰しました" << std::endl;
  }

  return 0;
}
```
* std::jmp_buf[color ff0000]
* std::longjmp[link longjmp.md]
* setjmp[link setjmp.md]

### 出力
```
何らかのエラー
エラーから復帰しました
```

## 関連項目
- [`longjmp()`](longjmp.md)
- [`setjmp()`](setjmp.md)
