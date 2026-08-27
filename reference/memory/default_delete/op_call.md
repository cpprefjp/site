# operator()
* memory[meta header]
* std[meta namespace]
* default_delete[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// 単一オブジェクト版
void operator()(T* ptr) const;                 // (1) C++11
constexpr void operator()(T* ptr) const;       // (1) C++23

// 配列版 (default_delete<T[]>)
void operator()(T* ptr) const;                 // (2) C++11
                                               //     C++14まで
template <class U>
void operator()(U* ptr) const = delete;        // (3) C++11
                                               //     C++14まで

template <class U>
void operator()(U* ptr) const;                 // (4) C++17
template <class U>
constexpr void operator()(U* ptr) const;       // (4) C++23
```

## 概要
渡されたポインタが指すオブジェクトを削除する。

- (1) : `delete`によって単一オブジェクトを削除する
- (2), (4) : `delete[]`によって配列を削除する
- (3) : `T*`以外のポインタを受け取らないようにするための、`delete`定義されたオーバーロード


## テンプレートパラメータ制約
- (4) : `U(*)[]`が`T(*)[]`に変換可能であること。満たさない場合はオーバーロード解決に参加しない


## 適格要件
- (1), (2) : 型`T`が完全型であること
- (4) : 型`U`が完全型であること


## 効果
- (1) : `delete ptr;`を呼び出す
- (2), (4) : `delete[] ptr;`を呼び出す


## 戻り値
なし


## 備考
- (3) : 配列版に`T*`へ暗黙変換できる派生クラスのポインタを渡せてしまうと、要素サイズの不一致により`delete[]`が誤った動作をする。これを防ぐため、`T*`以外を受け取るオーバーロードが`delete`定義されていた。
- (4) : C++17で(2)と(3)がこのオーバーロードに置き換えられた。`U(*)[]`から`T(*)[]`への変換 (`int[]`から`const int[]`への変換など) が可能な場合に限って呼び出せるため、`delete`定義されたオーバーロードを別途用意する必要がなくなった。


## 例
```cpp example
#include <memory>
#include <iostream>

struct X {
  ~X() { std::cout << "~X()" << std::endl; }
};

int main()
{
  // (1) 単一オブジェクトの削除
  std::default_delete<X> d1;
  d1(new X());

  // (2), (4) 配列の削除
  std::default_delete<X[]> d2;
  d2(new X[2]);
}
```
* std::default_delete[color ff0000]

### 出力
```
~X()
~X()
~X()
```


## バージョン
### 言語
- C++11


## 関連項目
- [`default_delete::(constructor)`](op_constructor.md)
- [`unique_ptr`](../unique_ptr.md)


## 参照
- [LWG Issue 938. `default_delete<T[]>::operator()` should only accept `T*`](https://cplusplus.github.io/LWG/issue938)
    - C++11で、配列版に、`T*`以外のポインタを受け取る(3)のオーバーロードが`delete`指定で追加された
- [LWG Issue 1193. `default_delete` cannot be instantiated with incomplete types](https://cplusplus.github.io/LWG/issue1193)
    - C++11で、クラステンプレート自体は不完全型で実体化してよく、この関数の実行時に完全型であることが要求されると整理された
- [N4089 Safe conversions in `unique_ptr<T[]>`, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4089.pdf)
    - C++17で、配列版の(2)と(3)が、制約付きのテンプレートである(4)へ置き換えられた
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
    - C++23で、この関数が`constexpr`対応した
