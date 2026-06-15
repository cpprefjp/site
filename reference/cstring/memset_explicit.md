# memset_explicit
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  void* memset_explicit(void* s, int c, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータを指定した値で埋める。最適化によって除去されないことが保証される。

C23で`<string.h>`に追加された関数であり、C++26で`<cstring>`に取り込まれた。

この関数はフリースタンディング環境でも提供される。


## 効果
`s`が指すオブジェクトの先頭`n`バイトのそれぞれに、値`c` (`unsigned char`に変換される) を書き込む。

この関数は、オブジェクトに格納された機密情報をアクセス不能にすることを目的とする。


## 戻り値
`s`を返す。


## 備考
- 通常の`memset`は、書き込み後にそのメモリが読み取られない場合、コンパイラの最適化によって書き込み自体が除去されることがある。この関数はそのような最適化による除去がされないことが保証されるため、パスワードや鍵などの機密情報をメモリ上から消去する用途に使用できる


## 例
```cpp example
#include <cstring>

int main()
{
  char password[16];
  // ... passwordを使用 ...

  // 使用後、メモリ上から確実に消去する
  std::memset_explicit(password, 0, sizeof(password));
}
```
* std::memset_explicit[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- `memset`: メモリデータを指定した値で埋める


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cstring>`に追加された
