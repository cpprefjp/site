# name_hint
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* class template[meta id-type]
* cpp29[meta cpp]

```cpp
template <same_as<char> T>
class thread::name_hint {
public:
  constexpr explicit name_hint(basic_string_view<T> n) noexcept; // (1) C++29
  name_hint(name_hint&&) = delete;                               // (2) C++29
  name_hint(const name_hint&) = delete;                          // (3) C++29
};

template <class T>
name_hint(const T*) -> name_hint<T>;           // (4) C++29

template <class T>
name_hint(basic_string<T>) -> name_hint<T>;    // (5) C++29
```
* same_as[link /reference/concepts/same_as.md]
* basic_string_view[link /reference/string_view/basic_string_view.md]
* basic_string[link /reference/string/basic_string.md]

## 概要
生成するスレッドの名前を設定するための、スレッド属性 (thread attribute) クラス。

[`thread`](../thread.md)または[`jthread`](../jthread.md)のコンストラクタで、関数オブジェクトより前の引数として渡すことで、デバッグやプラットフォーム固有の表示機構のためにスレッド名を設定する。スレッド名は、GDB・LLDB・Visual Studioなどのデバッガのスレッド一覧や、クラッシュダンプ・プロファイラなどの診断ツールで表示される。

```cpp
std::jthread t{std::thread::name_hint("Worker"), f, 42};
```

これはあくまでヒントであり、スレッドの名前付けをサポートしないプラットフォームでは無視される。

- (1) : 文字列`n`への参照（[`basic_string_view`](/reference/string_view/basic_string_view.md)）を保持して構築する
- (2), (3) : コピーもムーブもできない。コンストラクタ引数として直接渡して使う
- (4), (5) : 文字列リテラル・ポインタや[`basic_string`](/reference/string/basic_string.md)からテンプレート引数を推論できる

`jthread`では、別名`jthread::name_hint`としても使用できる。


## 備考
- テンプレートパラメータ`T`は現在`char`のみが許可される。将来ほかの文字型へ拡張する余地を残すため（ABIを壊さずに拡張できるように）テンプレートとして定義されている
- 名前の文字列は、`T`に関連付けられた文字エンコーディング（`char`では通常の文字列リテラルのエンコーディング）として解釈されることが推奨される
- 実装は、`name_hint`属性の値を`thread`/`jthread`オブジェクトに保存しないことが推奨される。属性オブジェクトはスレッドの生成後に破棄してよい
- スレッド名の長さにはプラットフォーム固有の制限がある（Linuxでは15文字＋終端など）


## 例
```cpp
#include <thread>
#include <iostream>
#include <pthread.h> // POSIX環境

void work(int n)
{
  // ...
}

int main()
{
  // スレッド名"Worker"を指定してスレッドを生成する
  std::jthread t{std::thread::name_hint("Worker"), work, 42};

  // 標準ライブラリにスレッド名を取得するAPIはないが、
  // ネイティブハンドルを通じてプラットフォームのAPIで取得できる
  char name[16]{};
  pthread_getname_np(t.native_handle(), name, sizeof(name));
  std::cout << name << std::endl;
}
```
* std::thread::name_hint[color ff0000]
* t.native_handle()[link ../jthread/native_handle.md]

### 出力例
```
Worker
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`stack_size_hint`](stack_size_hint.md)
- [`thread`のコンストラクタ](op_constructor.md)
- [`jthread`のコンストラクタ](../jthread/op_constructor.md)


## 参照
- [P2019R9 Thread attributes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p2019r9.pdf)
