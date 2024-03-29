# unexpected
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11deprecated[meta cpp]
* cpp17removed[meta cpp]

```cpp
namespace std {
  void unexpected();
}
```

この関数はC++11から非推奨となり、C++17で削除された。`throw`キーワードの代わりに使用する[`noexcept`キーワード](/lang/cpp11/noexcept.md)では、指定外の例外が発生することによるエラーは起こらない。

C++23から、同名の[`std::unexpected<E>`クラステンプレート](/reference/expected/unexpected.md)が追加される。C++17で削除された名前の再利用となっているが、この関数と同クラステンプレートの間に機能的な関係は一切ない。


## 概要
例外指定のある関数内で、指定外の例外が発生した時に呼び出される例外ハンドラを直接呼び出す。

この関数を呼び出すと、例外ハンドラが呼ばれ、さらに終了ハンドラが呼び出され、アプリケーションは終了する。ハンドラ内で例外を送出した場合は、この関数を呼び出した地点が、`try`ブロックで処理されていれば捕捉できる。


## 例

```cpp example
#include <stdexcept>
#include <iostream>

void unexpected_handler()
{
  std::cout << "unexpected handler called" << std::endl;
}

int main()
{
  std::set_unexpected(unexpected_handler);
  std::unexpected();
}
```
* std::unexpected()[color ff0000]
* std::set_unexpected[link set_unexpected.md]

### 出力
```
unexpected handler called
<例外キャッチを行っていないので、アプリケーション自体が終了する>
```

## 参照
- [C++17 非推奨だった古い例外仕様を削除](/lang/cpp17/remove_deprecated_exception_specifications.md)
