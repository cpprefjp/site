#デストラクタ (C++11)
```cpp
~unique_ptr();
```

##unique_ptrオブジェクトの破棄
所有権を持つ場合、所有しているリソースを解放する。


##効果
`get()` が `nullptr` でなければ `get_deleter()(get())` を呼び出す。。


##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
