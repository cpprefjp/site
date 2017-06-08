# 参照への参照を折りたたむ
* cpp11[meta cpp]

## 概要
C++03までは、`T&`型に左辺値参照を足すと、「参照への参照 (reference to reference)」となってしまいコンパイルエラーとなっていた。

C++11では、型の別名定義、テンプレートパラメータ、および`decltype`の文脈において、`T&`型に左辺値参照を足しても`T&`型となることが規定された。これを「reference collapsing (参照を折りたたむ)」という。


## 例
### 基本例
```cpp
int main()
{
  typedef int& ir;

  // C++03ではint& &となりコンパイルエラー
  // C++11ではint&となりOK
  typedef ir& irr;
}
```


### 回避策が不要になった例
```cpp
// 型Tを参照型にするメタ関数
template <class T>
struct add_lvalue_reference {
  typedef T& type;
};

// C++03では、参照への参照にならないように、この部分特殊化が必要
// C++11ではこの部分特殊化は必要ない (あっても問題はない)
template <class T>
struct add_lvalue_reference<T&> {
  typedef T& type;
};

int main()
{
  typedef add_lvalue_reference<int>::type ir;
  typedef add_lvalue_reference<int&>::type irr;
}
```


## 参照
- [CWG Issue 988. Reference-to-reference collapsing with decltype](https://wg21.cmeerw.net/cwg/issue988)
