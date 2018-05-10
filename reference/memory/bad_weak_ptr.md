# bad_weak_ptr
* memory[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class bad_weak_ptr : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`bad_weak_ptr`は、[`weak_ptr`](weak_ptr.md)オブジェクトから破棄済みの[`shared_ptr`](shared_ptr.md)オブジェクトを構築しようとした場合に発生する例外クラスである。

破棄済みの`shared_ptr`を監視する`weak_ptr`オブジェクトから`weak_ptr::lock()`メンバ関数で`shared_ptr`オブジェクトを構築した場合、すでに`shared_ptr`が破棄されていれば、例外を送出することなく空の`shared_ptr`が返される。しかし、破棄済みの`shared_ptr`を監視する`weak_ptr`オブジェクトが`shared_ptr`のコンストラクタ引数として渡された場合には、この例外が送出される。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|--------------------------------------------------------|-------|
| `bad_weak_ptr() noexcept;`<br/>`bad_weak_ptr(const bad_weak_ptr&) noexcept;` | コンストラクタ | C++11 |
| `virtual ~bad_weak_ptr() = default;`                     | デストラクタ | C++11 |
| `bad_weak_ptr& operator=(const bad_weak_ptr&) noexcept;` | 代入演算子 | C++11 |
| `virtual const char* what() const noexcept;`             | エラー内容を取得する。文字列`"bad_weak_ptr"`が返される | C++11 |

## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  auto sp = std::make_shared<int>(42);
  std::weak_ptr<int> wp(sp);

  sp.reset();
  try {
    std::shared_ptr<int> i(wp);
  } catch(std::exception const& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* std::make_shared[link make_shared.md]
* std::weak_ptr[link weak_ptr.md]
* sp.reset[link shared_ptr/reset.md]
* std::exception[link /reference/exception/exception.md]

### 出力(GCC 4.7での出力。規格上は"bad_weak_ptr"と出力されるのが正しい)
```
std::bad_weak_ptr
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.4, 4.7.2(`what()`が`"std::bad_weak_ptr"`を返すので規格違反。バグ報告済み。[#55847](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=55847))
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013
    - 2010までは`what()`が`"tr1::bad_weak_ptr"`を返す。

## 参照

