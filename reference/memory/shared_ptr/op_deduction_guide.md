# 推論補助
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  shared_ptr(weak_ptr<T>) -> shared_ptr<T>;      // (1)

  template <class T, class D>
  shared_ptr(unique_ptr<T, D>) -> shared_ptr<T>; // (2)
}
```
* weak_ptr[link /reference/memory/weak_ptr.md]
* unique_ptr[link /reference/memory/unique_ptr.md]

## 概要
`std::shared_ptr`クラステンプレートの型推論補助。

- (1) : [`std::weak_ptr`](/reference/memory/weak_ptr.md)から`std::shared_ptr`への変換
- (2) : [`std::unique_ptr`](/reference/memory/unique_ptr.md)から`std::shared_ptr`への変換


## 備考
- 生ポインタから`std::shared_ptr`への変換は推論できない。コンストラクタが `template <class Y> explicit shared_ptr(Y* p);` のようにクラステンプレートパラメータ`T`を直接使用しておらず、推論補助も定義されないからである
- ([`std::unique_ptr`](/reference/memory/unique_ptr.md)の推論補助ページがないためここに書くが、) 生ポインタから`std::unique_ptr`への変換も推論できない。これは、クラス内で`using pointer = T*;`のように`T*`の別名を付けたうえで、コンストラクタが`explicit unique_ptr(pointer);`のように、`T*`を直接使用せず、別名を使用しているためである
- これらは、生ポインタが配列か単一要素かを、一意に決められないためである。`std::shared_ptr`と[`std::unique_ptr`](/reference/memory/unique_ptr.md)には、単一要素版と配列版が定義されるが、推論補助では、引数からどちらを使用するかを決められない
    ```cpp
    int* p = new int[5];
    std::shared_ptr sp {p}; // 単一版か配列版かを決められないため、エラーとなるべき
    ```


## 例
```cpp example
#include <memory>
#include <type_traits>
#include <utility>

int main()
{
  // (1)
  // weak_ptrからshared_ptrへの変換
  std::shared_ptr<int> sp1_org {new int(3)}; // 注: 生ポインタからの変換は、推論できない
  std::weak_ptr wp = sp1_org;
  std::shared_ptr sp1 {wp};
  static_assert(std::is_same_v<
    decltype(sp1),
    std::shared_ptr<int>
  >);

  // (2)
  // unique_ptrからshared_ptrへの変換
  std::unique_ptr<int> up {new int(3)}; // 注: 生ポインタからunique_ptr<T>は推論できない
  std::shared_ptr sp2 {std::move(up)};
  static_assert(std::is_same_v<
    decltype(sp2),
    std::shared_ptr<int>
  >);
}
```
* std::weak_ptr[link /reference/memory/weak_ptr.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 7.1.0
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

