#属性構文
* cpp14[meta cpp]

##概要
属性(attributes)は、ソースコードに対して追加の情報をコンパイラに伝えるための構文である。

属性は`[[attr]]`のように、属性のリストを二重角カッコで囲んで指定する。C++11時点の標準では、以下の2つの属性を定義する：

1. `[[noreturn]]` : 関数が決して返らないことをコンパイラに伝える
2. `[[carries_dependency]]` : データの依存性を持たせる or 維持する


##仕様
(執筆中)

###`[[noreturn]]`属性
(執筆中)

###`[[carries_dependency]]`属性
(執筆中)


##関連項目
- [C++14 `[[deprecated]]`属性](/lang/cpp14/deprecated_attr.md)


##参照
- [N2236 Towards support for attributes in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2236.pdf)
- [N2379 Towards support for attributes in C++ (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2379.pdf)
- [N2418 Towards support for attributes in C++ (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2418.pdf)

