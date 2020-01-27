# friend宣言できる対象を拡張
* cpp11[meta cpp]

## 概要
C++03までの`friend`宣言は、直接のクラス型のみを指定できた。

C++11では`friend`宣言が拡張され、テンプレートパラメータ、および型の別名もまた`friend`宣言できるようになった。


## 仕様
`friend`宣言の構文が、以下のように拡張された：

```
friend elaborated-type-specifier ;
friend simple-type-specifier ;     // 追加
friend typename-specifier ;        // 追加
```

- `elaborated-type-specifier`は、従来の`friend`宣言できる型。クラス名、およびクラスの入れ�型を指定できる
- `simple-type-specifier`は、テンプレートパラメータの型を含む、`int`、`char`、`auto`、`void`、列挙型、型の別名などを表す�別�
- `typename-specifier`は、`typename`�ーワードを使用した、テンプレートパラメータに依�した入れ�型
- `friend`宣言に対して非クラス型が指定された場合、その宣言は無視される
- `friend`宣言に指定された型のCV修飾は無視される


## 例
```cpp
template <class Derived>
class base {
  // 派生クラスから、baseクラスのprivate機能にアクセスできるようにする
  friend Derived;

  // privateなデフォルトコンストラクタ
  base() {}
};

class derived : public base<derived> {
};

int main()
{
  derived d;
}
```

### 出力
```
```


## 参照
- [N1520 Extended friend Declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1520.pdf)
- [N1616 Extended friend Declarations (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1616.pdf)
- [N1722 Extended friend Declarations (Rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1722.pdf)
- [N1791 Extended friend Declarations (Rev. 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1791.pdf)

